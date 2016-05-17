// Type definitions for Rappid 1.5
// Project: http://jointjs.com/about-rappid
// Definitions by: Ewout Van Gossum <https://github.com/DenEwout>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../jointjs/jointjs.d.ts" />
/// <reference path="../backbone/backbone.d.ts" />

declare module joint {
    module ui {
        interface Handle {
            name: string;
            position: string;
            icon: string;
        }

        class Snaplines extends Backbone.Model {
            constructor(opt: any);

            startListening(): void;
        }


        class SelectionView extends Backbone.Model {
            paper: joint.dia.Paper;
            graph: joint.dia.Graph;
            model: Backbone.Collection<joint.dia.Cell>;

            constructor(opt: {
                paper: joint.dia.Paper;
                graph: joint.dia.Graph;
                model: Backbone.Collection<joint.dia.Cell>
            });

            createSelectionBox(cellView: joint.dia.CellView): void;

            destroySelectionBox(cellView: joint.dia.CellView): void;

            startSelecting(evt: any): void;

            cancelSelection(): void;

            addHandle(handle: Handle): void;

            removeHandle(name: string): void;

            changeHandle(name: string, handle: Handle): void;
        }

        class PaperScroller extends Backbone.View<Backbone.Model> {

            constructor(opt?: {
                paper: joint.dia.Paper;
                autoResizePaper ?: boolean
            });

            startPanning(evt: any): void;

            pan(evt: any): void;

            stopPanning(evt: any): void;

            center(): void;
            center(x: number, y: number): void;

            centerContent(): void;

            zoom(value: number, opt?: {
                max: number;
                min: number;
                grid: any;
                absolute: boolean;
            }): void;

            zoomToFit(opt?: {
                padding?: number;
                preserveAspectRatio?: boolean;
                minScaleX?: number;
                minScaleY?: number;
                maxScaleX?: number;
                maxScaleY?: number;
                scaleGrid?: number;
                fittingBBox?: { x: number; y: number; width: number;height: number}
            }): void;


        }
    }
}
