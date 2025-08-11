import React from 'react';
import './NOGLabSection.css';
import { useTranslation } from 'react-i18next';

const NOGLabSection = () => {
  const { t } = useTranslation();
  return (
    <div className="noglab-section">
      <div className="noglab-container">
        {/* Main Title */}
        <h1 className="noglab-shiny-title">
          {t('learn.title')}
        </h1>

        {/* Introduction */}
        <p className="noglab-body-text">
          {t('learn.intro1')}
        </p>
        <p className="noglab-body-text">
          {t('learn.intro2')}
        </p>
        <p className="noglab-body-text">
          {t('learn.intro3')}
        </p>

        {/* Subtitle 1 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle1')}
          </span>
        </div>

        <p className="noglab-body-text">
          {t('learn.body1')}
        </p>

        <p className="noglab-body-text">
          {t('learn.body2')}
        </p>
        <p className="noglab-body-text">
          {t('learn.body3')}
        </p>
        <p className="noglab-body-text">
          {t('learn.body4')}
        </p>

        <p className="noglab-body-text">
          {t('learn.body5')}
        </p>

        {/* Subtitle 2 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle2')}
          </span>
        </div>

        <p className="noglab-body-text">
          {t('learn.body6')}
        </p>
        <p className="noglab-body-text">
          {t('learn.body7')}
        </p>
        <p className="noglab-body-text">
          {t('learn.body8')}
        </p>

        {/* Subtitle 3 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle3')}
          </span>
        </div>

        <div className="noglab-principle-title">
          <span className="noglab-bold-text">{t('learn.explicability')}</span>
        </div>
        <p className="noglab-body-text">
          {t('learn.body9')}
        </p>

        <div className="noglab-principle-title">
          <span className="noglab-bold-text">{t('learn.accessibility')}</span>
        </div>
        <p className="noglab-body-text">
          {t('learn.body10')}
        </p>

        <div className="noglab-principle-title">
          <span className="noglab-bold-text">{t('learn.recall')}</span>
        </div>
        <p className="noglab-body-text">
          {t('learn.body11')}
        </p>

        <div className="noglab-principle-title">
          <span className="noglab-bold-text">{t('learn.speed')}</span>
        </div>
        <p className="noglab-body-text">
          {t('learn.body12')}
        </p>

        {/* Subtitle 4 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle4')}
          </span>
        </div>

        <p className="noglab-body-text">
          <span className="noglab-bold-text">{t('learn.engineeringCodesign')}</span> {t('learn.body13')}
        </p>

        <p className="noglab-body-text">
          <span className="noglab-bold-text">{t('learn.empiricalApproach')}</span> {t('learn.body14')}
        </p>

        <p className="noglab-body-text">
          {t('learn.body15')}
        </p>

        <p className="noglab-body-text">
          {t('learn.body16')}
        </p>

        {/* Subtitle 5 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle5')}
          </span>
        </div>

        <p className="noglab-body-text">
          {t('learn.body17')}
        </p>

        {/* Subtitle 6 */}
        <div className="noglab-section-subtitle">
          <span className="noglab-section-subtitle-text">
            {t('learn.subtitle6')}
          </span>
        </div>

        <p className="noglab-body-text">
          {t('learn.designPartnerInvite')}
        </p>
      </div>
    </div>
  );
};

export default NOGLabSection;
