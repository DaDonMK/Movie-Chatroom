insert into movie_ratings(movie_user_id, movie_rating_id, rating, rating_set)
values($1, $2, $3, true)
returning *;

-- insert into movie_ratings(movie_user_id, rating)
-- values($1, 2)
-- returning *;
