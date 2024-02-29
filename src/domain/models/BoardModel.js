export default class BoardModel {
  constructor(
    createdAt,
    creator,
    profile,
    content,
    likeCount,
    comments
  ) {
    this.createdAt = createdAt;
    this.creator = creator;
    this.profile = profile;
    this.content = content;
    this.likeCount = likeCount;
    this.comments = comments
  }
  
  toObject() {
    return {
      createdAt: this.createdAt,
      creator: this.creator,
      profile: this.profile,
      content: this.content,
      likeCount: this.likeCount,
      comments: this.comments
    };
  }
}
