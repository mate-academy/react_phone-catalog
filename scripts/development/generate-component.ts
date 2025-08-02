import fs from 'fs';
import path from 'path';

/**
 * Generates a new component scaffold with the following structure:
 * - A `.tsx` file with basic React component code.
 * - A `.module.scss` file with a placeholder class.
 * - An `index.ts` file to export the component.
 *
 * This script creates the component inside the `/scaffolds` directory under the root of the project.
 * If a component with the same name already exists, an error is thrown.
 *
 * Usage:
 *   node generate-component.ts <ComponentName>
 *   Example: node generate-component.ts Button
 *
 * Suggested usage:
 *   After generating a component placeholder, move it under /src folder
 *
 * @param {string} componentName - The name of the component to generate.
 * @throws {Error} If the component folder already exists or if no component name is provided.
 */
const componentName = process.argv[2];
const DEFAULT_SCAFFOLD_DIR = 'src_scaffolds';

if (!componentName) {
  console.error('❌ Usage: node generate-component.ts <ComponentName>');
  process.exit(1);
}

const scaffoldsDir = path.join(process.cwd(), DEFAULT_SCAFFOLD_DIR);
const componentDir = path.join(scaffoldsDir, componentName);

if (fs.existsSync(componentDir)) {
  console.error('❌ Scaffold already exists.');
  process.exit(1);
}

fs.mkdirSync(componentDir, { recursive: true });

// .tsx file content
const tsxContent = `import React from 'react';
import styles from './${componentName}.module.scss';

type Props = {
  key?: string;
};

export const ${componentName}: React.FC<Props> = () => {
  return <div className={styles.${componentName.toLowerCase()}}>${componentName}!</div>;
};
`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), tsxContent);

// .module.scss file content
const scssContent = '// styles here';

fs.writeFileSync(
  path.join(componentDir, `${componentName}.module.scss`),
  scssContent,
);

// index.ts content
fs.writeFileSync(
  path.join(componentDir, 'index.ts'),
  `export * from './${componentName}';\n`,
);

console.log(
  `✅ '${componentName}' scaffold created at /${DEFAULT_SCAFFOLD_DIR}/${componentName}`,
);
