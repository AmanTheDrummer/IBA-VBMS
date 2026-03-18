import { BuildingsService, CreateBuildingDto } from './buildings.service';
export declare class BuildingsController {
    private buildings;
    constructor(buildings: BuildingsService);
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    create(dto: CreateBuildingDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
