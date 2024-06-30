import type { Schema, Attribute } from '@strapi/strapi';

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.String;
  };
}

export interface TriggerAction extends Schema.Component {
  collectionName: 'components_tool_actions';
  info: {
    displayName: 'Action';
    icon: 'cursor';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    desc: Attribute.String;
    tag: Attribute.String;
    unique_id: Attribute.String;
  };
}

export interface TriggerTrigger extends Schema.Component {
  collectionName: 'components_trigger_triggers';
  info: {
    displayName: 'Trigger';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    unique_id: Attribute.String;
    desc: Attribute.String;
    tag: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'faq.faq': FaqFaq;
      'trigger.action': TriggerAction;
      'trigger.trigger': TriggerTrigger;
    }
  }
}
