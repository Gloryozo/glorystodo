create table mytask(
    id serial primary key,
    description varchar(255) not null    
);

insert into mytask(description) values('Doing the dishes');

insert into mytask(description) values('Washing the car');