select movie_ratings.movie_user_id, movies.movie_id, movie_ratings.rating, movies.title
from movies
join movie_ratings on movies.movie_id = movie_ratings.movie_rating_id
where movie_ratings.movie_user_id = $1 and movie_ratings.movie_rating_id = $2

-- select movie_ratings.rating, movies.title
-- from movies
-- join movie_ratings on movies.movie_id = movie_ratings.movie_rating_id
-- where movie_id=$1

-- select users.id, users.username, movie_ratings.rating
-- from users
-- join movie_ratings on users.id = movie_ratings.movie_rating_id
-- where users.id = $1

-- select users.id, users.username, movie_ratings.rating, movie_ratings.movie_rating_id
-- from movie_ratings
-- join users on movie_ratings.movie_user_id = users.id
-- where users.id = $1

-- select movie_ratings.movie_user_id, movie_ratings.movie_rating_id, movie_ratings.rating
-- from movie_ratings
-- join users on movie_ratings.movie_user_id = users.id
-- where movie_ratings.movie_user_id = $1 and movie_ratings.movie_rating_id = 2
