import { Vec3, Node, Color, EAxisDirection } from 'cc';
import EditableController from './editable';
import type { IControlMouseEvent } from '../utils/defines';
declare class ConeController extends EditableController {
    private _oriDir;
    private _center;
    private _radius;
    private _height;
    private _halfHeight;
    private _deltaRadius;
    private _deltaHeight;
    private _circleFromDir;
    private _sideLineMR;
    private _lowerCapMR;
    private _sideLineNode;
    private _lowerCapNode;
    private _mouseDeltaPos;
    private _curDistScalar;
    private _directionAxis;
    private _direction;
    get radius(): number;
    set radius(value: number);
    get height(): number;
    set height(value: number);
    get direction(): EAxisDirection;
    set direction(value: EAxisDirection);
    constructor(rootNode: Node);
    setColor(color: Color): void;
    _updateEditHandle(axisName: string): void;
    initShape(): void;
    getSideLinesData(center: Vec3, radius: number, height: number): import("../utils/defines").IMeshPrimitive;
    getLowerCapData(center: Vec3, radius: number, height: number): any;
    updateSize(center: Vec3, radius: number, height: number): void;
    onMouseDown(event: IControlMouseEvent): void;
    onMouseMove(event: IControlMouseEvent): void;
    onMouseUp(event: IControlMouseEvent): void;
    onMouseLeave(event: IControlMouseEvent): void;
    getDeltaRadius(): number;
    getDeltaHeight(): number;
}
export default ConeController;
//# sourceMappingURL=cone.d.ts.map