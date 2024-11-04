drop table if exists mytask;

create table account(
    id serial primary key,
    email varchar(50) unique not null,
    password varchar(255) not null
);

create table mytask(
    id serial primary key,
    description varchar(255) not null    
);

insert into mytask(description) values('Doing the dishes');

insert into mytask(description) values('Washing the car');