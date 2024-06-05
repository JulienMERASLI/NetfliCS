import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import pairwise_distances
import sqlite3

# Connexion à la base de données
conn = sqlite3.connect('database.sqlite3')

# Fetch des données de la base de données
cursor_movie = conn.execute("SELECT * FROM movie")
list_movie = cursor_movie.fetchall()

cursor_user = conn.execute("SELECT * FROM user")
list_user = cursor_user.fetchall()

cursor_movie_user = conn.execute("SELECT * FROM movie_user")
list_movie_user = cursor_movie_user.fetchall()

# Créer des DataFrames de données
movie = pd.DataFrame(list_movie, columns=['id', 'averageRating', 'category'])
user = pd.DataFrame(list_user, columns=['id', 'email', 'pseudo', 'birthdate', 'password', 'salt'])
movie_user = pd.DataFrame(list_movie_user, columns=['movie_id', 'user_id', 'status', 'note'])

# Créer the movie_table pivot table
movie_table = movie_user.pivot_table(index='user_id', columns='movie_id', values='note', fill_value=0)
movie_matrix = movie_table.values.astype(np.float32)

mean_user_rating = np.true_divide(movie_matrix.sum(1), (movie_matrix != 0).sum(1))
movie_matrix[movie_matrix==0] = np.tile(mean_user_rating, (movie_matrix.shape[1], 1)).T[movie_matrix==0]

print(movie_matrix)

# Calculer la similarité entre les utilisateur(Pearson)
user_similarity = 1 - pairwise_distances(movie_matrix, metric='correlation')

def predict(ratings, similarity, mean_user_rating, type='user'):
    if type == 'user':
        ratings_diff = (ratings - mean_user_rating[:, np.newaxis])

        pred = mean_user_rating[:, np.newaxis] + similarity.dot(ratings_diff) / np.array([np.abs(similarity).sum(axis=1)]).T
    elif type == 'item':
        pred = ratings.dot(similarity) / np.array([np.abs(similarity).sum(axis=1)])
    
    return pred

user_prediction = predict(movie_matrix, user_similarity, mean_user_rating, type='user')
print(user_prediction)
