select rating_set 
from movie_ratings
where movie_user_id = $1 and movie_rating_id = $2
