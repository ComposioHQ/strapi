import type { Schema, Attribute } from '@strapi/strapi';

export interface TriggerAction extends Schema.Component {
  collectionName: 'components_tool_actions';
  info: {
    displayName: 'Action';
    icon: 'cursor';
    description: '';
  };
  attributes: {};
}

export interface TriggerTrigger extends Schema.Component {
  collectionName: 'components_trigger_triggers';
  info: {
    displayName: 'Trigger';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'trigger.action': TriggerAction;
      'trigger.trigger': TriggerTrigger;
    }
  }
}
