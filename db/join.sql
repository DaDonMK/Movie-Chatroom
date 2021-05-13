select user_info2.first_name, user_info2.last_name
from user_info2
join users on user_info2.user_info_id = users.id
where id=$1



-- select user_info.first_name, user_info.last_name, user_info.user_username
-- from user_info
-- join users on user_info.user_username = users.username
-- where username=$1


-- select user_info.first_name, user_info.last_name, user_info.user_username
-- from user_info
-- join users on user_info.user_username = users.username
-- where username=$1


