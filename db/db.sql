create database fotos;

use fotos;

create table fotos (
    id int auto_increment primary key not null,
    url text,
    titulo varchar(150),
    fecha timestamp not null default current_timestamp,
    likes int,
    dislikes int,
    id_user int,
    foreign key (id_user) references users(id)
);

create table users (
    id int auto_increment primary key not null,
    username varchar(200),
    password varchar(200)
);

create table comentarios (
    id int auto_increment primary key not null,
    id_foto int,
    id_user int,
    coment varchar(250),
    foreign key (id_foto) references fotos(id),
    foreign key (id_user) references users(id)
);
