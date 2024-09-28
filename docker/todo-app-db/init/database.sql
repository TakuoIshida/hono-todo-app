# database
CREATE DATABASE IF NOT EXISTS `todo_app_db`;
CREATE DATABASE IF NOT EXISTS `todo_app_test`;

# user
CREATE USER 'todo_app_user'@'%' IDENTIFIED WITH mysql_native_password BY 'user_password_abc';
GRANT ALL PRIVILEGES ON todo_app_db.* TO 'todo_app_user'@'%';

CREATE USER 'todo_app_user_test'@'%' IDENTIFIED WITH mysql_native_password BY 'user_password_test';
GRANT ALL PRIVILEGES ON todo_app_test.* TO 'todo_app_user_test'@'%';