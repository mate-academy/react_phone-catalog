import { useEffect, useState } from 'react';
import './HelpDefenders.scss';
import { getOrganizationsWithJarInfo } from '../../api/fetchOrganizations';
import type { OrganizationFull } from '../../types/OrganizationsFull/OrganizationsFull';
import { useTranslationState } from '../../stateManagers/languageState';
import { useThemeState } from '../../stateManagers/themeState';
import { FundSkeleton } from '../../Components/FundSkeleton';

export const HelpDefenders = () => {
  const [organizations, setOrganizations] = useState<OrganizationFull[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { translate } = useTranslationState();
  const { theme } = useThemeState();

  useEffect(() => {
    setLoading(true);
    getOrganizationsWithJarInfo()
      .then((data) => {
        setOrganizations(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const skeletons = Array.from({ length: 16 });

  return (
    <section className={`section-helper section-helper--${theme}`}>
      <h1>{translate('They need help from you!')}</h1>
      {loading ?
        skeletons.map((_, i) => <FundSkeleton key={`skeleton-${i}`} />)
      : organizations.map((fund) => {
          const raised = Math.floor(fund.balance / 100);
          const goal = Math.floor(fund.goal / 100);
          const percent = Math.min(Math.round((raised / goal) * 100), 100);

          return (
            <div
              key={fund.id}
              className={`fund fund--${theme}`}
            >
              <img
                src={fund.img}
                alt={fund.name}
                className="fund__img"
              />
              <div className="fund__content">
                <h2>{translate(fund.name)}</h2>
                <p>{translate(fund.description)}</p>
                <div className="fund__stats">
                  <p>
                    <strong>{translate('Raised')}:</strong>{' '}
                    {raised.toLocaleString()} ₴
                  </p>
                  <p>
                    <strong>{translate('Goal')}:</strong>{' '}
                    {goal.toLocaleString()} ₴
                  </p>
                  <p>
                    <strong>{translate('Progress')}:</strong> {percent}%
                  </p>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <a
                  href={`https://send.monobank.ua/jar/${fund.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="donate-button"
                >
                  {translate('Donate')}
                </a>
              </div>
            </div>
          );
        })
      }
    </section>
  );
};
