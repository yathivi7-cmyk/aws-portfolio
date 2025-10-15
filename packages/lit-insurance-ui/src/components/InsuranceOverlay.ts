import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ThemedElement } from '../themed-element';

/**
 * A simple full‑screen overlay/modal component.  Clicking outside the
 * content will close the overlay.  Consumers can listen for the
 * `close` event to respond when the overlay is dismissed.
 */
@customElement('insurance-overlay')
export class InsuranceOverlay extends ThemedElement {
  /** Indicates whether the overlay is open */
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = [
    super.styles,
    css`
      :host {
        display: block;
      }
      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .content {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        max-width: 90vw;
        max-height: 90vh;
        overflow: auto;
      }
      :host(:not([open])) .backdrop {
        display: none;
      }
    `,
  ];

  private onBackdropClick() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  private stopPropagation(event: Event) {
    event.stopPropagation();
  }

  render() {
    return html`
      <div class="backdrop" @click=${this.onBackdropClick}>
        <div class="content" @click=${this.stopPropagation}>
          <slot></slot>
        </div>
      </div>
    `;
  }
}