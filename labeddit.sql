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

CREATE TABLE likes_dislikes_comments(
    user_id TEXT NOT NULL, 
    comment_id TEXT NOT NULL, 
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
    FOREIGN KEY (comment_id) REFERENCES comments(id)
);

DROP TABLE likes_dislikes_comments;