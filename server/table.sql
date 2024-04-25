create table user(
    user_id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    role varchar(20),
    UNIQUE  (email)
);

create table preference(
    user_id int not null,
    preference varchar(50),
    foreign key (user_id) references user(user_id)
);

insert into user(name, email, password, role) values('user1','user1@gmail.com','$2b$10$xCTzAirptwQCWnTc0qswUer59c0zQ7lqQAb0asAFUo335RSpVKlsO', 'USER'),
('admin1','admin1@gmail.com','$2b$10$xCTzAirptwQCWnTc0qswUer59c0zQ7lqQAb0asAFUo335RSpVKlsO', 'ADMIN');

create table book(
    book_id int primary key AUTO_INCREMENT,
    title varchar(250),
    isbn varchar(250),
    author varchar(250),
    publisher varchar(250),
    description varchar(500),
    year varchar(10),
    pdf_link varchar(500),
    image_link varchar(500),
    genre varchar(50),
    admin_user_id int not null,
    UNIQUE (isbn),
    foreign key (admin_user_id) references user(user_id)
);

insert into book(title,isbn,author,publisher,description,year,pdf_link,image_link,genre,admin_user_id) values('The theory of everything','1597775088,9781597775083','Stephen W Hawking','Phoenix Books',' “The Theory of Everything" is a unique opportunity to explore the cosmos with the greatest mind since Einstein. Based on a series of lectures given at Cambridge University, Professor Hawkings work introduced "the history of ideas about the universe" as well as todays most important scientific theories about time, space, and the cosmos in a clear, easy-to-understand way.','2006','https://cloudflare-ipfs.com/ipfs/bafykbzaceaytmjlhzgmha3vmc6z2dppr6imf6leqkfkthoyp5jhzbfmr3impm?filename=Stephen%20W%20Hawking%20-%20The%20theory%20of%20everything-Phoenix%20Books%20%282006%29.pdf','https://i.ibb.co/BVgCYjM/61-Xj-ZPGIZL-AC-UF1000-1000-QL80.jpg','Science fiction',2),
('The great beyond','9780471465959,0-471-46595-X','Paul Halpern','J. Wiley','The fundamental conundrum in physics today is the incompatibility of Einstein’s theory of general relativity with quantum mechanics. To bridge the gap between the two theories, a number of physicists have posited novel solutions involving hyperspace dimensions beyond the four that we can perceive and, most recently, branes, or membranes that exist in the fifth dimension and beyond. This lively account describes, in plain language, the history of hyperspace theory.','2004','https://cloudflare-ipfs.com/ipfs/bafykbzaceb5ejfppmbvysuijlxcgydcvrhwp74ouu4etncoiabp56dpzebro6?filename=Paul%20Halpern%20-%20The%20great%20beyond_%20higher%20dimensions%2C%20parallel%20universes%20and%20the%20extraordinary%20search%20for%20a%20theory%20of%20everything-J.%20Wiley%20%282004%29.pdf','https://i.ibb.co/8YwjVWF/375889.jpg','Science fiction',2),
('A Walk to Remember','0-446-60895-5','Nicholas Sparks','Grand Central Publishing','A Walk to Remember is a novel by American writer Nicholas Sparks, released in October 1999. The novel, set in 1958–1959 in Beaufort, North Carolina, is a story of two teenagers who fall in love with each other despite the disparity of their personalities. A Walk to Remember is adapted in the film of the same name.','1999','http://lholok.buchananschools.com/uploads/8/7/0/4/8704325/a_walk_to_remember_-_nicholas_sparks.pdf','https://i.ibb.co/0GxcTD9/201906-walk-to-remember-9781538764695-680x1020-1.jpg','romance',2),
('Perfume','9780375725845','Patrick Süskind','Diogenes','Perfume: The Story of a Murderer is a 1985 literary historical fantasy novel by German writer Patrick Süskind. The novel explores the sense of smell and its relationship with the emotional meanings that scents may have.','1985','https://www.pairfum.com/documents/Perfume-Patrick-Suskind-The-Story-Of-Murderer.pdf','https://i.ibb.co/m5Y3V17/Perfume-The-Story-of-a-Murderer.jpg','mystery',2),
('Dune','9780425071601','Frank Herbert','Chilton Books','Dune is a 1965 epic science fiction novel by American author Frank Herbert, originally published as two separate serials in Analog magazine. It tied with Roger Zelaznys This Immortal for the Hugo Award for Best Novel and won the inaugural Nebula Award for Best Novel in 1966.','1965','https://ebooks.rahnuma.org/1690308873-Dune.pdf.html','https://i.ibb.co/2M664xZ/44767458.jpg','Science fiction',2),
('Frankenstein','9780192822833','Mary Shelley','Henry Colburn and Richard Bentley','Frankenstein or, The Modern Prometheus is an 1818 novel written by English author Mary Shelley. Frankenstein tells the story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment.','1818','https://rauterberg.employee.id.tue.nl/lecturenotes/DDM110%20CAS/Shelley-1818%20Frankenstein.pdf','https://i.ibb.co/71cJ6hh/81z7-E0u-Wdt-L-AC-UF1000-1000-QL80.jpg','Science fiction',2),
('Hyperion','9780747234821', 'Dan Simmons', 'Hachette Books', 'Hyperion is a 1989 science fiction novel by American author Dan Simmons. The first book of his Hyperion Cantos series, it won the Hugo Award for best novel. The plot of the novel features multiple time-lines and characters. It follows a similar structure to The Canterbury Tales by Geoffrey Chaucer.','1989', 'https://www.gutenberg.org/files/5436/5436-h/5436-h.htm','https://i.ibb.co/WVmNWBK/Hyperion-cover.jpg','Science fiction', 2);

create table online_read(
    user_id int not null,
    book_id int not null,
    foreign key (user_id) references user(user_id),
    foreign key (book_id) references book(book_id)

);

create table offline_read(
    user_id int not null,
    book_id int not null,
    start_date date,
    end_date date,
    isBorrowed boolean,
    foreign key (user_id) references user(user_id),
    foreign key (book_id) references book(book_id)
);

create table notification(
    notification_id int primary key AUTO_INCREMENT,
    description varchar(500),
    user_id int not null,
    foreign key (user_id) references user(user_id)
);

insert into notification(description, user_id) values("Welcome to Library Management System", 1);

create table review(
    review_id int primary key AUTO_INCREMENT,
    description varchar(500),
    user_id int not null,
    foreign key (user_id) references user(user_id)
);