import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import pairwise_distances
import sqlite3
import argparse

argparser = argparse.ArgumentParser()
argparser.add_argument('--user', type=int, required=True)
user_id = argparser.parse_args().user

# Connexion à la base de données
conn = sqlite3.connect('database.sqlite3')

# Récupérer les données de la table movie_user
cursor_movie_user = conn.execute("SELECT * FROM movie_user")
list_movie_user = cursor_movie_user.fetchall()

# Créer des DataFrames de données
movie_user = pd.DataFrame(list_movie_user, columns=['movie_id', 'user_id', 'status', 'note'])

# Créer the movie_table pivot table
movie_table = movie_user.pivot_table(index='user_id', columns='movie_id', values='note', fill_value=0)
movie_matrix = movie_table.values.astype(np.float32)


mean_user_rating = np.true_divide(movie_matrix.sum(1), (movie_matrix != 0).sum(1))
movie_matrix_orig = movie_matrix.copy()
movie_matrix[movie_matrix == 0] = np.tile(mean_user_rating, (movie_matrix.shape[1], 1)).T[movie_matrix == 0]

# Calculer la similarité entre les utilisateurs (Pearson)
user_similarity = 1 - pairwise_distances(movie_matrix, metric='correlation')

def predict(ratings, similarity, mean_user_rating, type='user'):
    if type == 'user':
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])
        pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / np.array([np.abs(similarity).sum(axis=1)])
    return pred

user_prediction = predict(movie_matrix, user_similarity, mean_user_rating, type='user')

# Trouver les deux movie_id avec les valeurs de prédiction les plus élevées pour chaque user_id
#[:, -n:] n doit être le même que celui du film que vous souhaitez obtenir.
top_highest_rated_movies = np.argsort(user_prediction, axis=1)[:, -20:][:, ::-1]
user_ids = movie_table.index
movie_ids = movie_table.columns

target_user_index = user_ids.get_loc(user_id)
top_highest_rated_movies = np.argsort(user_prediction[target_user_index])
top_highest_rated_movies = np.setdiff1d(top_highest_rated_movies, np.nonzero(movie_matrix_orig[target_user_index]))[-20:][::-1]
    
top_movies = [movie_ids[movie_index] for movie_index in top_highest_rated_movies]
print(top_movies)
