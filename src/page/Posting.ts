import Page, { PageProps } from "../core/Page";
import HTMLElementViewModel from "../core/HTMLElementViewModel";
import store from "../store";
import { Comment } from "../types";
import CommentModel from "../model/CommentModel";

import "../components/Posting";
import "../components/Comment";
import "../components/CommentForm";

const html = /* html */ `
<hny-posting></hny-posting>
<ul m-ref="comments"></ul>
<hny-comment-form></hny-comment-form>

<style scoped>
  @import url("/styles/component.css");

  :host {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
`;

window.customElements.define(
  "hny-posting-page",
  class extends HTMLElementViewModel<{}> {
    constructor() {
      super({
        html,
        data: {},
        mounted: () => {
          const [, , postId] = window.location.pathname.split("/");

          store.$watcher.message.push((_, newValue) => {});

          store.$watcher.comments.push((_, comments) => {
            this.$ref.comments.innerHTML = "";

            comments.forEach((comment: Comment) => {
              const commentItem = new CommentModel({
                ...comment,
              });
              this.$ref.comments.appendChild(commentItem.generateElement());
            });
          });

          store.$methods.getMessageById(postId);
        },
      });
    }
  }
);

const PostingPage = class extends Page {
  constructor({ target, component }: PageProps) {
    super({ target, component });
  }

  setup(): void {
    const postingPage = document.createElement("hny-posting-page");
    this.$target.appendChild(postingPage);
  }
};

export default PostingPage;
