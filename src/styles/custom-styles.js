import { css } from 'lit-element';

/*
This file is reserved for any custom css that developers want to add to
customize their theme. Simply add your css to this file and yarn build.
*/

export default css`
  .m-markdown p:not(:first-child) {
    margin-block-start: 6px;
  }
`;