import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemedElement } from '../themed-element';

/**
 * A simple button component styled with the themed colours.
 *
 * @slot - Default slot for button contents when the label property is not used.
 * @cssprop --primary-color - Background colour for the button.
 */
@customElement('insurance-button')
export class InsuranceButton extends ThemedElement {
  /** Label to display inside the button.  If omitted, the default slot
   * is rendered instead. */
  @property({ type: String }) label: string = 'Click Me';

  /** When true, disables the button and applies disabled styling. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  static styles = [
    super.styles,
    css`
      button {
        background-color: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
      }
      button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `,
  ];

  render() {
    return html`<button ?disabled=${this.disabled}>${this.label || html`<slot></slot>`}</button>`;
  }
}