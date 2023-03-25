-- Active: 1675095298905@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME())
);

CREATE TABLE posts(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    creator_id TEXT NOT NULL,
    content TEXT,
    comments INTEGER DEFAULT(0) NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
);


CREATE TABLE comments (
    id TEXT PRIMARY KEY NOT NULL UNIQUE, 
    creator_id TEXT NOT NULL, 
    content TEXT,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    post_id TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE likes_dislikes_posts(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY (user_id) REFERENCES users (id)
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

DROP TABLE users;

CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL, 
    comment_id TEXT NOT NULL, 
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);

INSERT INTO users (id, name, email, password, role)
VALUES ("u001", "Heytor", "heytor@email.com", "123654","ADMIN"),
("u002", "Natália", "natalia@email.com", "123456","NORMAL");

INSERT INTO posts (id, creator_id, content)
VALUES ("p001", "u001", "Você quer visitar qual cidade do mundo?"),
("p002", "u002", "Qual time você torce?"),
("p003", "u002", "Melhor filme que já viu?");

INSERT INTO comments(id, creator_id, content, post_id)
VALUES("c001", "u002", "Tóquio", "p001"),
("c002", "u001", "Flamengo", "p002"),
("c003", "u001", "Interestelar", "p003");

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;

SELECT * FROM likes_dislikes_posts;

SELECT * FROM likes_dislikes_comments;