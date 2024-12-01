export interface BuildManifest {
  version: string;
  [key: string]: any;
}

export interface Build {
  id: number;
  image_id: number;
  name: string;
  manifest: BuildManifest;
}