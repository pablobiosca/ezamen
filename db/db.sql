create database fotos;

use fotos;

create table fotos (
    id int auto_increment primary key not null,
    url text,
    titulo varchar(150),
    fecha timestamp not null default current_timestamp,
    likes int,
    dislikes int,
    id_user int
);

create table users (
    
);

