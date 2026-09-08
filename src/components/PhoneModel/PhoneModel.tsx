/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BANNERS } from '../../constants/constJS';
import { setGlobalLoading } from '../../slices/uiSlice';
import { useAppDispatch } from '../../hooks/helperToolkit';

interface Props {
  activeIndex: number;
}

function useGLTFPreload() {
  BANNERS.forEach(banner => {
    useGLTF.preload(banner.model);
  });
}

export const PhoneModel: React.FC<Props> = ({ activeIndex }) => {
  const dispatch = useAppDispatch();
  const gltf = useGLTF(BANNERS[activeIndex].model);
  const modelRef = useRef<THREE.Group>(null);

  useGLTFPreload();

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.003;
    }
  });

  useEffect(() => {
    if (!gltf) {
      dispatch(setGlobalLoading(true));
    } else {
      dispatch(setGlobalLoading(false));
    }
  }, [gltf]);

  return (
    <primitive
      object={gltf.scene}
      ref={modelRef}
      scale={1.3}
      position={[0, 0, 0]}
      rotation={[0.2, 0, 0]}
    />
  );
};
