from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import pandas as pd
import umap
import plotly.express as px
import plotly.io as pio
import numpy as np

def jaccard_distance(set1, set2):
    return 1 - (len(set1.intersection(set2)) / len(set1.union(set2)))

file_path = 'C:\\Users\\jcour\\Work Github\\Gene-Set-Visualizer\\static\\enrichment-GO.tsv'
df = pd.read_csv(file_path, sep='\t', header=0)

n = df.shape[0]

distance_matrix = np.zeros((n, n))

for i in range(n):
    for j in range (i + 1, n):
        set1 = set(df.iloc[i, 6].split())
        set2 = set(df.iloc[j, 6].split())
        dist = jaccard_distance(set1, set2)
        distance_matrix[i, j] = dist
        distance_matrix[j, i] = dist


reducer = umap.UMAP(metric='precomputed')

embedding = reducer.fit_transform(distance_matrix)

# Make Data Frame for website display with the embedding results
embedding_df = pd.DataFrame(embedding, columns=['X', 'Y'])
embedding_df['Q-value'] = df['Q-value'].values
embedding_df['Gene set name'] = df['Gene set name'].values
embedding_df['Effective gene set size'] = df['Effective gene set size'].values
# Make interactive graph
fig = px.scatter(
    embedding_df, x='X', y='Y',
    title='UMAP projection of the Gene dataset',
    hover_name='Gene set name',
    color='Q-value',
    color_continuous_scale=[(0.00, 'rgb(167, 3, 255)'), (0.25, 'rgb(167, 3, 255)'), 
                            (0.25, 'rgb(199, 94, 255)'), (0.50, 'rgb(199, 94, 255)'),
                            (0.50, 'rgb(206, 132, 245)'), (0.75, 'rgb(206, 132, 245)'), 
                            (0.75, 'rgb(235, 196, 255)'), (1.00, 'rgb(235, 196, 255)')]
)
#size='Effective gene set size',
# Save the plot as an HTML file
# Convert the figure to HTML and add custom JavaScript for onclick evzent
html_str = pio.to_html(fig, full_html=False)

custom_js = """
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
console.log('testing');
document.addEventListener('DOMContentLoaded', function() {
    var myPlot = document.getElementsByClassName('plotly-graph-div');
    console.log(myPlot);
    var myPlot = document.getElementsByClassName('plotly-graph-div')[0];
    myPlot.on('plotly_click', function(data){
        var point = data.points[0];
        var geneSetName = point.data.hovertext[point.pointIndex];
        console.log('Gene set name:', geneSetName);
        console.log('X:', point.x);
        console.log('Y:', point.y);
        console.log(data);
        var pn='',
            tn='',
            colors=[];
        for(var i=0; i < data.points.length; i++) {
            pn = data.points[i].pointNumber;
            tn = data.points[i].curveNumber;
            colors = data.points[i].data.marker.color;
        };
        colors[pn] = '#6bfc03';
        var update = {'marker': {color: colors}}
        Plotly.restyle(myPlot, update, [tn]);
    });
});
</script>
"""
with open('static/gene_plot.html', 'w', encoding='utf-8') as f:
    f.write(html_str + custom_js)
