import type { Schema, Attribute } from '@strapi/strapi';

export interface ActionLinkActionLinks extends Schema.Component {
  collectionName: 'components_action_link_action_links';
  info: {
    displayName: 'action_links';
    description: '';
  };
  attributes: {
    unique_id: Attribute.String;
    name: Attribute.String;
  };
}

export interface CoverCover extends Schema.Component {
  collectionName: 'components_cover_covers';
  info: {
    displayName: 'cover';
    icon: 'book';
  };
  attributes: {
    heading: Attribute.String;
    subtitle: Attribute.String;
    features_block: Attribute.String;
    playground_tip: Attribute.String;
  };
}

export interface CtaSectionCtaSection extends Schema.Component {
  collectionName: 'components_cta_section_cta_sections';
  info: {
    displayName: 'cta_section';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.String;
  };
}

export interface FaqFaq extends Schema.Component {
  collectionName: 'components_faq_faqs';
  info: {
    displayName: 'FAQ';
    description: '';
  };
  attributes: {
    question: Attribute.String;
    answer: Attribute.Text;
  };
}

export interface FeatureBoxFeatureSection extends Schema.Component {
  collectionName: 'components_feature_box_feature_sections';
  info: {
    displayName: 'feature_section';
    description: '';
  };
  attributes: {
    description: Attribute.String;
    image: Attribute.String;
    title: Attribute.String;
  };
}

export interface GuideBoxGuideBox extends Schema.Component {
  collectionName: 'components_guide_box_guide_boxes';
  info: {
    displayName: 'guide_box';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface ToolsSectionToolsSection extends Schema.Component {
  collectionName: 'components_tools_section_tools_sections';
  info: {
    displayName: 'tools_section';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
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

export interface VideoBlockVideoBlock extends Schema.Component {
  collectionName: 'components_video_block_video_blocks';
  info: {
    displayName: 'video_block';
  };
  attributes: {
    description: Attribute.String;
    video_url: Attribute.String;
    heading: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'action-link.action-links': ActionLinkActionLinks;
      'cover.cover': CoverCover;
      'cta-section.cta-section': CtaSectionCtaSection;
      'faq.faq': FaqFaq;
      'feature-box.feature-section': FeatureBoxFeatureSection;
      'guide-box.guide-box': GuideBoxGuideBox;
      'tools-section.tools-section': ToolsSectionToolsSection;
      'trigger.action': TriggerAction;
      'trigger.trigger': TriggerTrigger;
      'video-block.video-block': VideoBlockVideoBlock;
    }
  }
}
