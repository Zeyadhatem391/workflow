export type CategoryItem = {
    id: string;
    name: string;
};

export type CategoryTableProps = {
    title: string;
    description: string;
    addLabel: string;
    data: CategoryItem[];

    onAdd?: (name: string) => void;
    onDelete?: (id: string) => void;
    onUpdate?: (id: string, name: string) => void;
};