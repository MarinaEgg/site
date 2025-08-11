import React from 'react';
import './learnsection.css';
import { useTranslation } from 'react-i18next';

const LearnSection = () => {
  const { t } = useTranslation();
  return (
    <div className="learn-section">
      <div className="learn-container">
        {/* Main Title */}
        <h1 className="learn-shiny-title">
          {t('learn.title')}
        </h1>

        {/* Introduction */}
        <p className="learn-body-text">
          {t('learn.intro1')}
        </p>
        <p className="learn-body-text">
          {t('learn.intro2')}
        </p>
        <p className="learn-body-text">
          {t('learn.intro3')}
        </p>

        {/* Subtitle 1 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle1')}
          </span>
        </div>

        <p className="learn-body-text">
          {t('learn.body1')}
        </p>

        <p className="learn-body-text">
          {t('learn.body2')}
        </p>
        <p className="learn-body-text">
          {t('learn.body3')}
        </p>
        <p className="learn-body-text">
          {t('learn.body4')}
        </p>

        <p className="learn-body-text">
          {t('learn.body5')}
        </p>

        {/* Subtitle 2 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle2')}
          </span>
        </div>

        <p className="learn-body-text">
          {t('learn.body6')}
        </p>
        <p className="learn-body-text">
          {t('learn.body7')}
        </p>
        <p className="learn-body-text">
          {t('learn.body8')}
        </p>

        {/* Subtitle 3 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle3')}
          </span>
        </div>

        <div className="learn-principle-title">
          <span className="learn-bold-text">{t('learn.explicability')}</span>
        </div>
        <p className="learn-body-text">
          {t('learn.body9')}
        </p>

        <div className="learn-principle-title">
          <span className="learn-bold-text">{t('learn.accessibility')}</span>
        </div>
        <p className="learn-body-text">
          {t('learn.body10')}
        </p>

        <div className="learn-principle-title">
          <span className="learn-bold-text">{t('learn.recall')}</span>
        </div>
        <p className="learn-body-text">
          {t('learn.body11')}
        </p>

        <div className="learn-principle-title">
          <span className="learn-bold-text">{t('learn.speed')}</span>
        </div>
        <p className="learn-body-text">
          {t('learn.body12')}
        </p>

        {/* Subtitle 4 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle4')}
          </span>
        </div>

        <p className="learn-body-text">
          <span className="learn-bold-text">{t('learn.engineeringCodesign')}</span> {t('learn.body13')}
        </p>

        <p className="learn-body-text">
          <span className="learn-bold-text">{t('learn.empiricalApproach')}</span> {t('learn.body14')}
        </p>

        <p className="learn-body-text">
          {t('learn.body15')}
        </p>

        <p className="learn-body-text">
          {t('learn.body16')}
        </p>

        {/* Subtitle 5 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle5')}
          </span>
        </div>

        <p className="learn-body-text">
          {t('learn.body17')}
        </p>

        {/* Subtitle 6 */}
        <div className="learn-section-subtitle">
          <span className="learn-section-subtitle-text">
            {t('learn.subtitle6')}
          </span>
        </div>

        <p className="learn-body-text">
          {t('learn.designPartnerInvite')}
        </p>
      </div>
    </div>
  );
};

export default LearnSection;
