export class PaginationHelper<T> {
  private collection: T[];

  private itemsPerPage: number;

  constructor(collection: T[], itemsPerPage: number) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  itemCount() {
    return this.collection.length;
  }

  pageCount() {
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }

  pageItemCount(pageIndex: number) {
    const totalPages = this.pageCount();

    if (pageIndex < 0 || pageIndex >= totalPages) {
      return -1;
    }

    if (pageIndex === totalPages - 1) {
      return this.collection.length % this.itemsPerPage || this.itemsPerPage;
    }

    return this.itemsPerPage;
  }

  pageIndex(itemIndex: number) {
    if (itemIndex < 0 || itemIndex >= this.collection.length) {
      return -1;
    }

    return Math.floor(itemIndex / this.itemsPerPage);
  }
}
