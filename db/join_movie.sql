-- select movie_ratings.rating, movies.title
-- from movie_ratings
-- join movies on movie_ratings.movie_user_id = movies.movie_id
-- where movie_id=$1

select movie_ratings.movie_user_id, movies.movie_id, movie_ratings.rating, movies.title
from movies
join movie_ratings on movies.movie_id = movie_ratings.movie_rating_id
where movie_ratings.movie_user_id = $1 and movie_ratings.movie_rating_id = $2

-- movie_ratings.movie_user_id 