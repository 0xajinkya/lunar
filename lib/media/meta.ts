import type { IMediaKind } from "./types";

export const AllowedExtension = [
    // Only PDF
    'pdf',
  ] as const;
  
  export const AllowedMimetypes = [
    // Only PDF
    'application/pdf',
  ] as const;
  
  export type IAllowedMimetype = (typeof AllowedMimetypes)[number];
  export type IAllowedExtension = (typeof AllowedExtension)[number];
  
  export const ExtensionOfMimetype: Record<IAllowedMimetype, IAllowedExtension> =
    {
      'application/pdf': 'pdf',
    };
  
  export const MimetypeOfExtension: Record<IAllowedExtension, IAllowedMimetype> =
    {
      pdf: 'application/pdf',
    };
  
  export const MediaKindOfMimetype: Record<IAllowedMimetype, IMediaKind> = {
    'application/pdf': 'document',
  };
  