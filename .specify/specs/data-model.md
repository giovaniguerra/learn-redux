# Data Model

## Entities

### User
- **ID**: Unique identifier for the user.
- **Name**: Full name of the user.
- **Email**: Email address of the user.
- **Phone**: Contact number.

### Post
- **ID**: Unique identifier for the post.
- **UserID**: Identifier linking the post to a user.
- **Title**: Title of the post.
- **Body**: Content of the post.

### Comment
- **ID**: Unique identifier for the comment.
- **PostID**: Identifier linking the comment to a post.
- **Name**: Name of the commenter.
- **Email**: Email of the commenter.
- **Body**: Content of the comment.

## Relationships

- **User ↔ Post**: One-to-Many (A user can have multiple posts).
- **Post ↔ Comment**: One-to-Many (A post can have multiple comments).