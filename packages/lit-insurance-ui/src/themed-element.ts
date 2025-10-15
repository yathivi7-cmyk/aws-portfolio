import { LitElement, css } from 'lit';

/**
 * Base class for themed components.  Defines CSS variables for
 * primary, secondary and text colours that can be overridden by
 * consumers.  Components extend this class to inherit the theme.
 */
export abstract class ThemedElement extends LitElement {
  static styles = css`
    :host {
      --primary-color: #004785;
      --secondary-color: #1a98ff;
      --text-color: #333;
    }
  `;
}