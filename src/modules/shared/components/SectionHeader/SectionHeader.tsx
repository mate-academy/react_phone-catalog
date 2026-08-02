import styles from './SectionHeader.module.scss';

interface SectionHeaderProps {
    title: string;
    onPrevious: () => void;
    onNext: () => void;
    previousDisabled?: boolean;
    nextDisabled?: boolean;
}

function SectionHeader({
    title,
    onPrevious,
    onNext,
    previousDisabled = false,
    nextDisabled = false,
}: SectionHeaderProps) {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeader__title}>{title}</h2>

            <div
                className={styles.sectionHeader__navigation}
                aria-label={`${title} navigation`}
            >
                <button
                    className={`${styles.sectionHeader__button} ${styles['sectionHeader__button--previous']}`}
                    type="button"
                    onClick={onPrevious}
                    disabled={previousDisabled}
                    aria-label={`Scroll ${title} products backwards`}
                />

                <button
                    className={`${styles.sectionHeader__button} ${styles['sectionHeader__button--next']}`}
                    type="button"
                    onClick={onNext}
                    disabled={nextDisabled}
                    aria-label={`Scroll ${title} products forwards`}
                />
            </div>
        </div>
    );
}

export default SectionHeader;
