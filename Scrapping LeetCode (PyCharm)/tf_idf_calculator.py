# first get all the data from those files
# save to particular arrays in

prob_desc = []
prob_title = []
prob_url = []
prob_topic = []
prob_diff = []

for x in range(1, 1229):
    file1 = open('All_Problems_set/Problems_titles/problem_title_' + str(x) + '.txt', 'r')
    Lines = file1.readlines()
    prob_title.append(Lines[0].strip('\n').strip(',').lower())
    file1 = open('All_Problems_set/Problems_links/problem_url_' + str(x) + '.txt', 'r')
    Lines = file1.readlines()
    prob_url.append(Lines[0].strip('\n').strip(',').lower())
    file1 = open('All_Problems_set/Problems_description/problem_' + str(x) + '.txt', 'r')
    Lines = file1.readlines()
    prob_descr = ""
    for line in Lines:
        prob_descr += line.strip('\n').strip(',')
    prob_descr.lower()
    prob_desc.append(prob_descr)
    file1 = open('All_Problems_set/Problem_difficulty/problem_difficulty_' + str(x) + '.txt', 'r')
    Lines = file1.readlines()
    prob_diff.append(Lines[0].strip('\n').strip(',').lower())
    file1 = open('All_Problems_set/Problem_topics/problem_topic_' + str(x) + '.txt', 'r')
    Lines = file1.readlines()
    prob_topic.append(Lines[0].strip('\n').strip(',').lower())

# from nltk.corpus import stopwords
# stopwords.words('english')
# print(stopwords.words())

# print(stopwords.words(prob_desc[0]))
# print(prob_title)
# # print(prob_title)
# # print(prob_title)
# # print(prob_title)
# data modelling done

# for x in range(1, 1228):
#     print([entry.lower() for entry in prob_descr[x-1].split(' ')])

# print(prob_descr)

import pandas as pd
import numpy as np
import os
import re
import operator
import nltk
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
import operator

## Create Vocabulary
print(len(prob_title))
vocabulary = set()
for doc in prob_title:
    vocabulary.update(doc.split(' '))
vocabulary = list(vocabulary)
# Intializating the tfIdf model
tfidf = TfidfVectorizer(vocabulary=vocabulary)
print(len(tfidf.vocabulary))
# Fit the TfIdf model
tfidf.fit(prob_title)
# Transform the TfIdf model
tfidf_tran = tfidf.transform(prob_title)
print(tfidf_tran)


def gen_vector_T(tokens):
    Q = np.zeros((len(vocabulary)))
    x = tfidf.transform(tokens)
    # print(tokens[0].split(','))
    for token in tokens[0].split(' '):
        # print(token)
        try:
            ind = vocabulary.index(token)
            Q[ind] = x[0, tfidf.vocabulary_[token]]
        except:
            pass
    return Q

def cosine_sim(a, b):
    cos_sim = np.dot(a, b)/(np.linalg.norm(a)*np.linalg.norm(b))
    return cos_sim


def cosine_similarity_T(k, query):
    preprocessed_query = re.sub("\W+", " ", query).strip()
    tokens = word_tokenize(str(preprocessed_query))
    q_df = pd.DataFrame(columns=['q_clean'])
    q_df.loc[0, 'q_clean'] = tokens
    d_cosines = []

    query_vector = gen_vector_T(q_df['q_clean'])
    for d in tfidf_tran.A:
        d_cosines.append(cosine_sim(query_vector, d))

    out = np.array(d_cosines).argsort()[-k:][::-1]
    # print("")
    d_cosines.sort()
    a = pd.DataFrame()
    for i, index in enumerate(out):
        a.loc[i, 'index'] = str(index)
        a.loc[i, 'Subject'] = prob_title[i][index]
    for j, simScore in enumerate(d_cosines[-k:][::-1]):
        a.loc[j, 'Score'] = simScore
    return a

print(cosine_similarity_T(10, 'computer science').head())