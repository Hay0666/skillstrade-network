
import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { MessageReport } from '@/types/chat';
import { toast } from 'sonner';
import { Check, ShieldAlert, X } from 'lucide-react';
import { moderateReport } from '@/utils/chatUtils';

const ModerationDashboard: React.FC = () => {
  const [reports, setReports] = useState<MessageReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<MessageReport | null>(null);
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve');

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = () => {
    try {
      const storedReports = localStorage.getItem('skillswap_reports');
      if (storedReports) {
        const parsedReports: MessageReport[] = JSON.parse(storedReports);
        setReports(parsedReports.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ));
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    }
  };

  const handleViewReport = (report: MessageReport) => {
    setSelectedReport(report);
    setModeratorNotes('');
  };

  const handleConfirmAction = (report: MessageReport, action: 'approve' | 'reject') => {
    setSelectedReport(report);
    setActionType(action);
    setConfirmDialogOpen(true);
  };

  const handleSubmitAction = () => {
    if (!selectedReport) return;

    const success = moderateReport(selectedReport.id, actionType, moderatorNotes);
    if (success) {
      toast.success(`Report ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`);
      setConfirmDialogOpen(false);
      loadReports();
    } else {
      toast.error('Failed to process report');
    }
  };

  const getPendingReports = () => reports.filter(report => report.status === 'pending');
  const getReviewedReports = () => reports.filter(report => report.status !== 'pending');

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5 text-primary" />
          Moderation Dashboard
        </CardTitle>
        <CardDescription>
          Review reported messages and take appropriate actions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending">
          <TabsList className="mb-4">
            <TabsTrigger value="pending">
              Pending
              {getPendingReports().length > 0 && (
                <Badge variant="destructive" className="ml-2">{getPendingReports().length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {getPendingReports().length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No pending reports</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getPendingReports().map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reporterName}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{formatDate(report.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleConfirmAction(report, 'approve')}
                            className="text-red-500 border-red-200 hover:text-red-700 hover:bg-red-50"
                          >
                            <Check className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleConfirmAction(report, 'reject')}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          <TabsContent value="reviewed">
            {getReviewedReports().length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviewed reports</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getReviewedReports().map(report => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reporterName}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>
                        <Badge>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(report.timestamp)}</TableCell>
                      <TableCell>
                        {report.moderatorNotes || <span className="text-muted-foreground italic">None</span>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' ? 'Approve Report' : 'Reject Report'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' 
                ? 'This will hide the reported message and mark the report as reviewed.' 
                : 'This will keep the message visible and mark the report as rejected.'}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Optional moderator notes"
              value={moderatorNotes}
              onChange={(e) => setModeratorNotes(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitAction}
              variant={actionType === 'approve' ? 'destructive' : 'default'}
            >
              Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ModerationDashboard;
