import React, { FC } from 'react';

import * as Styled from './Social.styles';

interface SocialItem {
  title: string;
  link: string;
  icon: string;
}

const socials: ReadonlyArray<SocialItem> = [
  {
    link: 'https://github.com/sylcastaing',
    title: 'Profil Github',
    icon: 'fab fa-github',
  },
  {
    link: 'https://fr.linkedin.com/in/sylvain-castaing',
    title: 'Profil Linkedin',
    icon: 'fab fa-linkedin',
  },
  {
    link: 'mailto:contact@sylvain-castaing.fr',
    title: 'Email',
    icon: 'fas fa-envelope',
  },
  {
    link: 'https://gitlab.com/sylcastaing',
    title: 'Profil GitLab',
    icon: 'fab fa-gitlab',
  },
];

const Social: FC = () => (
  <Styled.SocialContainer>
    {socials.map(item => (
      <Styled.SocialItem key={item.link}>
        <a href={item.link} title={item.title} target="_blank" rel="noopener noreferrer">
          <i className={item.icon} />
        </a>
      </Styled.SocialItem>
    ))}
  </Styled.SocialContainer>
);

export default Social;
