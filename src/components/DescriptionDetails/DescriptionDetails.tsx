import { useAppSelector } from '../../hooks/helperToolkit';
import styles from './DescriptionDetails.module.scss';

export const DescriptionDetails = () => {
  const selectedDevice = useAppSelector(state => state.device.selectedDevice);

  const productDescription =
    selectedDevice?.description.map(section => ({
      ...section,
      text: section.text.map(paragraph =>
        paragraph.replace(/{productName}/g, selectedDevice?.name),
      ),
    })) || [];

  const techSpecs = [
    { label: 'Screen', value: selectedDevice?.screen },
    { label: 'Resolution', value: selectedDevice?.resolution },
    { label: 'Processor', value: selectedDevice?.processor },
    { label: 'RAM', value: selectedDevice?.ram },
    { label: 'Built in memory', value: selectedDevice?.capacity },
    { label: 'Camera', value: selectedDevice?.camera },
    { label: 'Zoom', value: selectedDevice?.zoom },
    { label: 'Cell', value: selectedDevice?.cell?.join(', ') },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.info}>
        <h3 className={styles.section_title}>About</h3>
        {productDescription.map(section => (
          <div key={section.title} className={styles.about_block}>
            <h4 className={styles.paragraph_title}>{section.title}</h4>
            {section.text.map((paragraph, i) => (
              <p
                key={`${section.title}-${i}`}
                className={styles.text_description}
              >
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.tech_specs}>
        <h3 className={styles.section_title}>Tech specs</h3>
        <table>
          <tbody>
            {techSpecs
              .filter(spec => spec.value)
              .map(spec => (
                <tr key={spec.label}>
                  <td>{spec.label}</td>
                  <td>{spec.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
