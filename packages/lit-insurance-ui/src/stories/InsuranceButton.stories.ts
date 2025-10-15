import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../components/InsuranceButton';

const meta: Meta = {
  title: 'Components/InsuranceButton',
  component: 'insurance-button',
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: 'Buy Policy',
    disabled: false,
  },
  render: ({ label, disabled }: any) => html`
    <insurance-button .label=${label} ?disabled=${disabled}></insurance-button>
  `,
};