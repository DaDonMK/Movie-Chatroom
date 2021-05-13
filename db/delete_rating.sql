DELETE FROM movie_ratings
WHERE movie_rating_id = $1 and movie_user_id = $2
returning *;