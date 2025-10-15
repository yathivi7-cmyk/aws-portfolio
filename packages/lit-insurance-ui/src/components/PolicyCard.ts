import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemedElement } from '../themed-element';

/**
 * Displays summary information about an insurance policy.  This
 * component uses the themed colours and is fully accessible via
 * ARIA roles.
 *
 * @cssprop --primary-color - Border colour for the card.
 * @cssprop --secondary-color - Colour for the premium value.
 */
@customElement('policy-card')
export class PolicyCard extends ThemedElement {
  /** Title of the policy */
  @property({ type: String }) title: string = '';
  /** Description of the coverage or details */
  @property({ type: String }) description: string = '';
  /** Premium amount to display */
  @property({ type: String }) premium: string = '';

  static styles = [
    super.styles,
    css`
      .card {
        border: 1px solid var(--primary-color);
        border-radius: 8px;
        padding: 1rem;
        background-color: #fff;
        color: var(--text-color);
        max-width: 300px;
      }
      .title {
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      .premium {
        color: var(--secondary-color);
        font-weight: bold;
        margin-top: 0.5rem;
      }
    `,
  ];

  render() {
    return html`
      <div class="card" role="region" aria-label="Insurance policy card">
        <div class="title">${this.title}</div>
        <div class="description">${this.description}</div>
        <div class="premium">${this.premium}</div>
      </div>
    `;
  }
}