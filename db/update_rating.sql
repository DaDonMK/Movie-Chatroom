UPDATE movie_ratings
SET rating = $1
WHERE movie_rating_id = $2 and movie_user_id = $3
returning *