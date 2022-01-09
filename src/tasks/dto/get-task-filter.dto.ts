import { TaskStatus } from "../task.model";
import { IsEnum, IsString, IsOptional } from 'class-validator'

export class GetTaskFilterDto{
    @IsOptional()
    @IsString()
    search?: string;
    
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;
}