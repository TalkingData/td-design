const code = [
  {
    name: "表格1",
    details: "我描述1",
    title: `<template>
    <div>
        <Table :columns="column" :data="data" :loading="loading" border size="small"></Table>
        <div style="text-align: center;margin: 16px 0">
            <Page
                :total="total"
                :current.sync="current"
                show-sizer
                @on-change="getData"
                @on-page-size-change="handleChangeSize">
            </Page>
        </div>
    </div>
    </template>
    <script>
    export default {
        data () {
            return {
                total: 1000,
                current: 1,
                size: 10,
                loading: false,
                column: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        indexMethod: (row) => {
                            return (row._index + 1) + (this.size * this.current) - this.size;
                        }
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    }
                ],
                data: []
            }
        },
        methods: {
            // 改变分页数量时触发，修改每页数，并请求数据
            handleChangeSize (val) {
                this.size = val;
                this.getData();
            },
            // 请求数据
            getData () {
                // 这里要将 this.current 和 this.size 参数传递到服务端来异步请求数据，这里用 setTimeout 来模拟异步。
                if (this.loading) return;  // 如果 this.loading 为 true，说明正在请求数据中
    
                this.loading = true;
    
                setTimeout(() => {
                    // 伪造测试数据
                    const data = [];
                    for (let i = 0; i < this.size; i++) {
                        data.push({
                            name: '按钮'
                        });
                    }
                    this.data = data;
                    this.loading = false;
                }, 1000);
            }
        },
        mounted () {
            // 初始化时，直接请求数据
            this.getData();
        }
    }
    </script>`
  },
  {
    name: "表格2",
    details: "我描述2",
    title: `<template>
        <div>
            <Table
                :columns="column"
                :data="data"
                :loading="loading"
                border
                size="small"
                @on-sort-change="handleSortChange"
                @on-filter-change="handleFilterChange"
            ></Table>
            <div style="text-align: center;margin: 16px 0">
                <Page
                    :total="total"
                    :current.sync="current"
                    @on-change="getData"
                ></Page>
            </div>
        </div>
    </template>
    <script>
        export default {
            data () {
                return {
                    total: 1000,
                    current: 1,
                    size: 10,
                    loading: false,
                    sortType: 'normal',  // 当前排序类型，可选值为：normal（默认） || asc（升序）|| desc（降序）
                    filterType: undefined,
                    column: [
                        {
                            title: '号码',
                            key: 'number',
                            sortable: 'custom'
                        },
                        {
                            title: '等级',
                            key: 'status',
                            filters: [
                                {
                                    label: '级别 1',
                                    value: 1
                                },
                                {
                                    label: '级别 2',
                                    value: 2
                                }
                            ],
                            filterMultiple: false,
                            filterMethod (value, row) {
                                if (value === 1) {
                                    return row.status === 1;
                                } else if (value === 2) {
                                    return row.status === 2;
                                }
                            },
                            filterRemote (value) {
                                this.filterType = value[0];
                            },
                            render: (h, { row }) => {
                                if (row.status === 1) {
                                    return h('Tag', {
                                        props: {
                                            color: 'green'
                                        }
                                    }, '等级 1');
                                } else if (row.status === 2) {
                                    return h('Tag', {
                                        props: {
                                            color: 'red'
                                        }
                                    }, '等级 2');
                                }
                            }
                        }
                    ],
                    data: []
                }
            },
            methods: {
                // 点击排序按钮时触发
                handleSortChange ({ column, key, order }) {
                    // 将排序保存到数据，并重新请求数据
                    this.sortType = order;
                    this.current = 1;
                    this.getData();
                },
                // 过滤条件改变时触发
                handleFilterChange () {
                    // 过滤值已在 filterRemote 里保存，所以直接重新请求数据
                    this.current = 1;
                    this.getData();
                },
                // 请求数据
                getData () {
                    // 这里要将 this.current 和 this.sortType 及 this.filterType 参数传递到服务端来异步请求数据，这里用 setTimeout 来模拟异步。
                    if (this.loading) return;  // 如果 this.loading 为 true，说明正在请求数据中
    
                    this.loading = true;
    
                    setTimeout(() => {
                        // 伪造测试数据，实际场景里，这里应该是服务端直接返回处理好的数据，前端直接赋值给 this.data 即可
                        const data = [];
                        for (let i = 0; i < this.size; i++) {
                            const status = this.filterType === 1 ? 1 : this.filterType === 2 ? 2 : Math.floor(Math.random () * 2 + 1);
                            let number;
                            if (this.sortType === 'asc') {
                                number = (i + 1) + (this.size * this.current) - this.size;
                            } else if (this.sortType === 'desc') {
                                number = this.total - ((this.current - 1) * this.size) - i;
                            } else {
                                number = Math.floor(Math.random () * this.total + 1);
                            }
    
                            data.push({
                                status: status,
                                number: number
                            });
                        }
    
                        this.data = data;
                        this.loading = false;
                    }, 1000);
                }
            },
            mounted () {
                // 初始化时，直接请求数据
                this.getData();
            }
        }
    </script>`
  }
];

export default code;
