Create table blogs (id integer primary key, author text, url text not null, title text not null, likes integer default 0);
insert into blogs  values (1, 'Paul Graham', 'http://www.paulgraham.com/vb.html', 'Life is Short')
insert into blogs values (2, 'Sam Altman', 'https://blog.samaltman.com/idea-generation', 'Idea Generation')
SELECT + from blogs;