insert into user_info2(user_info_id, first_name, last_name)
values ($1, $2, $3)
returning *;

-- insert into user_info2(user_username, first_name, last_name)
-- values ($1, $2, $3)
-- returning *;

-- select user_info.first_name, user_info.last_name
-- from user_info
-- join users on user_info.user_info_id = users.id
-- where id=$1