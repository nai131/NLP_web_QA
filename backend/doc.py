import json
import pickle

from gensim.test.utils import common_texts, get_tmpfile
from gensim.models import Word2Vec
from gensim.models.doc2vec import Doc2Vec, TaggedDocument
import os 
dir_path = os.path.dirname(os.path.realpath(__file__))

from scipy import spatial

###################################################### QUESTION ##############################################################

def question_separator(question):
  question_list = [e.lower() for e in question.strip().strip('?').split(' ')]
  return question_list

def q_word_eliminator(question):
  no_qword_question = []
  for word in question:
    if word not in ['who','what','when','where','why','how','is','am','are','do','does','did', 'was', 'were']:
      if word in ["isn't","aren't","don't","doesn't","didn't","wasn't","weren't"] :
        no_qword_question.append('not')
      else : no_qword_question.append(word) 
  return no_qword_question

def create_query_index(query, model):
  vector = []
  for q in query:
    if len(vector) == 0:
      if q in model.wv: vector = model.wv[q]
    else:
      if q in model.wv: vector = vector + model.wv[q]
  return vector

def clean_data(datalist):
  cleaned_data_list = []
  for w in datalist:
    w = w.lower()
    tmp = ""
    for i,token in enumerate(w):
      if(token not in ['!', '"', "'", '(', ')', '*', '+', ',', '-', '.', '/', '|', '?', ';',':', '@', '#', '$', '%', '^', '&' ]):
        tmp+= token.lower()
    cleaned_data_list.append(tmp)
  return cleaned_data_list


###################################################### IMPORT DATA ##############################################################

def getReqData():
    PIK = dir_path + '/../pdf_abstract.pickle'
    with open(PIK, "rb") as f:
        pdf = pickle.load(f)

    PIK_IDDICT = dir_path + '/../iddict_abstract.pickle'
    with open(PIK_IDDICT, 'rb') as f:
        iddict = pickle.load(f)


    return (pdf, iddict)


def getAllData():
    
    PIK_WF = dir_path + '/../wordfreq_abstract.pickle'
    with open(PIK_WF, "rb") as f:
        word_freq = pickle.load(f)

    PIK_DOC = dir_path + '/../documents_abstract.pickle'
    with open(PIK_DOC, 'rb') as f:
        documents = pickle.load(f)

    return (word_freq, documents)
###################################################### IMPORT MODEL ##############################################################

def getModels():

    path = get_tmpfile(dir_path + "/../word2vec_abstract.model")
    # model_w2v = Word2Vec(word_list, size=100, window=5, min_count=1, workers=4)
    # model_w2v.save(path)
    model_w2v = Word2Vec.load(path)

    path_d2v = get_tmpfile(dir_path + "/../doc2vec_abstract.model")
    # model_d2v = Doc2Vec(documents, vector_size=100, window=2, min_count=1, workers=4)
    # model_d2v.save(path_d2v)
    model_d2v = Doc2Vec.load(path_d2v)

    return (model_w2v, model_d2v)

###################################################### COMPUTING ##############################################################

def preprocess_question(Question):

    word_freq, documents = getAllData()

    model_w2v, model_d2v = getModels()

    question_list = question_separator(Question)
    clean_question = q_word_eliminator(question_list)
    question = []
    for w in clean_question:
        if w not in word_freq.keys():
            question.append(w)
    question_vector = create_query_index(question, model_w2v)
    results = [0 for e in documents]
    for i,doc in enumerate(documents) : 
        document_vector = model_d2v.docvecs[i]
        result = 1 - spatial.distance.cosine(question_vector, document_vector)
        results[i] = (result,i)

    results = sorted(results)[::-1]
    tenbestresults = results[0:10]

    del documents
    del model_w2v
    del model_d2v

    return tenbestresults


