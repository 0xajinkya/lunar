export const MediaKind = ['document'] as const;

export type IMediaKind = (typeof MediaKind)[number];

export interface IMediaObject {
    id: string;
    filename: string;
    mimetype: string;
    path: string;
    width: number | null;
    height: number | null;
    kind: IMediaKind;
    location: string;
}
